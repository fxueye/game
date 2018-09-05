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

type ItemConfigElem struct {
	Id int
	Name string
	ItemType int
	Icon string
	Star int
	AddType int
	WorthPrice int
	Iconframe string
	IconScale float32
	
}

type ItemConfig0 struct {
	Dic map[int]*ItemConfigElem
	Arr []*ItemConfigElem
}

var (
	ItemConfig ItemConfig0
)

func loadItemConfig(path string) {
	file, err := os.Open(path)
	defer func() {
		if file != nil {
			file.Close()
		}
	}()
	if err != nil {
		panic(fmt.Sprint("load config error, path=", path))
	}

	ItemConfig.Dic = make(map[int]*ItemConfigElem)
	ItemConfig.Arr = make([]*ItemConfigElem, 0, 32)

	bt,err  :=  ioutil.ReadAll(file)
	json.Unmarshal(bt, &ItemConfig.Arr)
	for _,conf := range ItemConfig.Arr{
		ItemConfig.Dic[conf.Id] = conf
	}
	
}
