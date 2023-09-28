package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"regexp"
	"sort"
	"strconv"
	"strings"
)

type frequency struct {
	character rune
	count     int
}
type Room struct {
	name     string
	sector   int
	checksum string
}
type DecryptedRoom struct {
	room          Room
	decryptedName string
}

func main() {
	total := part1("./input")
	fmt.Printf("Part 1 result is %d\n", total)
	secretSector := part2("./input")
	fmt.Printf("Part 2 result is %d\n", secretSector)
}
func part1(path string) int {
	data, err := readInput(path)
	if err != nil {
		log.Fatal(err)
	}
	validRooms := getValidRooms(data)

	total := 0
	for _, room := range validRooms {
		total += room.sector
	}
	return total
}
func getValidRooms(data []string) []Room {
	validRooms := []Room{}

	for _, line := range data {
		room, err := parseLine(line)
		if err != nil {
			log.Fatal("line didn't result in a Room struct after parse")
		}
		freq, _ := getFrequencyOfLetters(room.name)

		checksumValidCount := 0

		// freq in order, checksum should be in order, we can just go 0, 1, 2, 3, 4
		for i := 0; i < 5; i++ {
			if room.checksum[i] == byte(freq[i].character) {
				checksumValidCount += 1
			}
		}
		if checksumValidCount == 5 {
			validRooms = append(validRooms, room)
		}
	}
	return validRooms
}

func part2(path string) int {
	/*
		filter valid rooms
		rotate each letter of room name by sector (char - 'a' + (sector mod 26) mod 26 + 'a'
		then something about North Pole objects - print to see I guess?
		as I removed spaces I needed to find "northpoleobjectstorage"
	*/
	data, err := readInput(path)
	if err != nil {
		log.Fatal(err)
	}
	validRooms := getValidRooms(data)
	expected := "northpoleobjectstorage"
	for _, room := range validRooms {
		shift := room.sector % 26
		a := int('a')
		decryptedRoom := DecryptedRoom{room: room, decryptedName: ""}
		for _, char := range room.name {
			decryptedRoom.decryptedName += string(rune((int(char)-a+shift)%26 + a))
		}

		if decryptedRoom.decryptedName == expected {
			return decryptedRoom.room.sector
		}
	}

	return 0
}

func getFrequencyOfLetters(name string) ([]frequency, error) {
	dict := make(map[rune]int)

	for _, c := range name {
		_, ok := dict[c]
		if !ok {
			dict[c] = 0
		}
		dict[c] += 1
	}
	list := []frequency{}
	for k, v := range dict {
		list = append(list, frequency{character: k, count: v})
	}

	sort.Slice(list, func(i, j int) bool {
		if list[i].count == list[j].count {
			return list[i].character < list[j].character
		}
		return list[i].count > list[j].count
	})
	return list, nil
}

func parseLine(line string) (Room, error) {
	r, _ := regexp.Compile(`([a-z]+)([0-9]+).([a-z]+).`)
	noDashLine := strings.ReplaceAll(line, "-", "")
	results := r.FindStringSubmatch(noDashLine)

	parsedSector, err := strconv.Atoi(results[2])
	if err != nil {
		return Room{}, err
	}
	room := Room{
		name:     results[1],
		sector:   parsedSector,
		checksum: results[3],
	}

	return room, nil
}

func readInput(path string) ([]string, error) {
	file, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	var lines []string
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		lines = append(lines, scanner.Text())
	}
	return lines, scanner.Err()
}
