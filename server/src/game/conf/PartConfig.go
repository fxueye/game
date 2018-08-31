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

type PartConfigElem struct {
	Id int
	ArmName []string
	Name string
	Type int
	TexName []string
	Slots []int
	MeSlots []int
	Show int
	IconScale float32
	Deviation []float32
	
}

type PartConfig0 struct {
	Dic map[int]*PartConfigElem
	Arr []*PartConfigElem
}

var (
	PartConfig PartConfig0
)

func loadPartConfig(path string) {
	file, err := os.Open(path)
	defer func() {
		if file != nil {
			file.Close()
		}
	}()
	if err != nil {
		panic(fmt.Sprint("load config error, path=", path))
	}

	PartConfig.Dic = make(map[int]*PartConfigElem)
	PartConfig.Arr = make([]*PartConfigElem, 0, 32)

	bt,err  :=  ioutil.ReadAll(file)
	json.Unmarshal(bt, &PartConfig.Arr)
	for _,conf := range PartConfig.Arr{
		PartConfig.Dic[conf.Id] = conf
	}
	
}
