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

type BdConfigElem struct {
	Id int
	PlayTimes int
	Animation string
	ArmName string
	Name string
	Type int
	TexName string
	Slots []int
	
}

type BdConfig0 struct {
	Dic map[int]*BdConfigElem
	Arr []*BdConfigElem
}

var (
	BdConfig BdConfig0
)

func loadBdConfig(path string) {
	file, err := os.Open(path)
	defer func() {
		if file != nil {
			file.Close()
		}
	}()
	if err != nil {
		panic(fmt.Sprint("load config error, path=", path))
	}

	BdConfig.Dic = make(map[int]*BdConfigElem)
	BdConfig.Arr = make([]*BdConfigElem, 0, 32)

	bt,err  :=  ioutil.ReadAll(file)
	json.Unmarshal(bt, &BdConfig.Arr)
	for _,conf := range BdConfig.Arr{
		BdConfig.Dic[conf.Id] = conf
	}
	
}
