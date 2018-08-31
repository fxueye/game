package conf

import (
	//"bufio"
	"encoding/json"
	"fmt"
	//"io"
	"io/ioutil"
	"os"
	//"strings"
)

type SlotsConfigElem struct {
	Id int
	Name string
	BeforeSlot []int
	Des string
	
}

type SlotsConfig0 struct {
	Dic map[int]*SlotsConfigElem
	Arr []*SlotsConfigElem
}

var (
	SlotsConfig SlotsConfig0
)

func loadSlotsConfig(path string) {
	file, err := os.Open(path)
	defer func() {
		if file != nil {
			file.Close()
		}
	}()
	if err != nil {
		panic(fmt.Sprint("load config error, path=", path))
	}

	SlotsConfig.Dic = make(map[int]*SlotsConfigElem)
	SlotsConfig.Arr = make([]*SlotsConfigElem, 0, 32)

	bt,err  :=  ioutil.ReadAll(file)
	json.Unmarshal(bt, &SlotsConfig.Arr)
	for _,conf := range SlotsConfig.Arr{
		SlotsConfig.Dic[conf.Id] = conf
	}
	
}
