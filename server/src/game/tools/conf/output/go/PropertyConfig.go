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

type PropertyConfigElem struct {
	Id int
	Name string
	Type int
	Image string
	Icon string
	IconScale float32
	Deviation []float32
	Sort int
	Location []int
	
}

type PropertyConfig0 struct {
	Dic map[int]*PropertyConfigElem
	Arr []*PropertyConfigElem
}

var (
	PropertyConfig PropertyConfig0
)

func loadPropertyConfig(path string) {
	file, err := os.Open(path)
	defer func() {
		if file != nil {
			file.Close()
		}
	}()
	if err != nil {
		panic(fmt.Sprint("load config error, path=", path))
	}

	PropertyConfig.Dic = make(map[int]*PropertyConfigElem)
	PropertyConfig.Arr = make([]*PropertyConfigElem, 0, 32)

	bt,err  :=  ioutil.ReadAll(file)
	json.Unmarshal(bt, &PropertyConfig.Arr)
	for _,conf := range PropertyConfig.Arr{
		PropertyConfig.Dic[conf.Id] = conf
	}
	
}
