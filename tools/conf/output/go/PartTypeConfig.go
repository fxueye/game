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

type PartTypeConfigElem struct {
	Id int
	Parent int
	Name string
	Icon string
	IconDown string
	Gender int
	
}

type PartTypeConfig0 struct {
	Dic map[int]*PartTypeConfigElem
	Arr []*PartTypeConfigElem
}

var (
	PartTypeConfig PartTypeConfig0
)

func loadPartTypeConfig(path string) {
	file, err := os.Open(path)
	defer func() {
		if file != nil {
			file.Close()
		}
	}()
	if err != nil {
		panic(fmt.Sprint("load config error, path=", path))
	}

	PartTypeConfig.Dic = make(map[int]*PartTypeConfigElem)
	PartTypeConfig.Arr = make([]*PartTypeConfigElem, 0, 32)

	bt,err  :=  ioutil.ReadAll(file)
	json.Unmarshal(bt, &PartTypeConfig.Arr)
	for _,conf := range PartTypeConfig.Arr{
		PartTypeConfig.Dic[conf.Id] = conf
	}
	
}
