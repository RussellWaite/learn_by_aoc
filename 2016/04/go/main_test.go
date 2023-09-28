package main

import (
	"fmt"
	"testing"
)

func Test_parseLine(t *testing.T) {
	result, err := parseLine("vxupkizork-sgmtkzoi-pkrrehkgt-zxgototm-644[kotgr]")
	if err != nil {
		t.Error(" %w", err)
	}
	wanted1 := "vxupkizorksgmtkzoipkrrehkgtzxgototm"
	if result.name != wanted1 {
		t.Error("result wasn't correct, wanted", wanted1, "but received", result.name)
	}

	wanted2 := 644
	if result.sector != wanted2 {
		t.Error("result wasn't correct, wanted", wanted2, "but received", result.sector)
	}
	wanted3 := "kotgr"
	if result.checksum != wanted3 {
		t.Error("result wasn't correct, wanted", wanted3, "but received", result.checksum)
	}
}

func Test_getFrequencyOfLetters(t *testing.T) {
	input := "aaaaaabbbbbccccdddeef"

	result, _ := getFrequencyOfLetters(input)

	if result[0].character != 'a' {
		t.Error("a was not the first element")
	}
	if result[5].character != 'f' {
		t.Error("f was not the last element")
	}
}

func Test_part1Example(t *testing.T) {
	total := part1("./test")
	expected := 1514
	if total != expected {
		t.Error(fmt.Sprintf("The example should have been %d but was %d", expected, total))
	}
}

func Test_part1Real(t *testing.T) {
	total := part1("./input")
	expected := 137896
	if total != expected {
		t.Error(fmt.Sprintf("The example should have been %d but was %d", expected, total))
	}
}
func Test_part2Real(t *testing.T) {
	total := part2("./input")
	expected := 501
	if total != expected {
		t.Error(fmt.Sprintf("The example should have been %d but was %d", expected, total))
	}
}
