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

type PropertyTypeConfigElem struct {
	Id int
	Parent int
	Name string
	Bg int
	Icon string
	IconDown string
	
}

type PropertyTypeConfig0 struct {
	Dic map[int]*PropertyTypeConfigElem
	Arr []*PropertyTypeConfigElem
}

var (
	PropertyTypeConfig PropertyTypeConfig0
)

func loadPropertyTypeConfig(path string) {
	file, err := os.Open(path)
	defer func() {
		if file != nil {
			file.Close()
		}
	}()
	if err != nil {
		panic(fmt.Sprint("load config error, path=", path))
	}

	PropertyTypeConfig.Dic = make(map[int]*PropertyTypeConfigElem)
	PropertyTypeConfig.Arr = make([]*PropertyTypeConfigElem, 0, 32)

	bt,err  :=  ioutil.ReadAll(file)
	json.Unmarshal(bt, &PropertyTypeConfig.Arr)
	for _,conf := range PropertyTypeConfig.Arr{
		PropertyTypeConfig.Dic[conf.Id] = conf
	}
	
}
