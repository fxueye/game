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

type TipConfigElem struct {
	Id int
	Tip string
	
}

type TipConfig0 struct {
	Dic map[int]*TipConfigElem
	Arr []*TipConfigElem
}

var (
	TipConfig TipConfig0
)

func loadTipConfig(path string) {
	file, err := os.Open(path)
	defer func() {
		if file != nil {
			file.Close()
		}
	}()
	if err != nil {
		panic(fmt.Sprint("load config error, path=", path))
	}

	TipConfig.Dic = make(map[int]*TipConfigElem)
	TipConfig.Arr = make([]*TipConfigElem, 0, 32)

	bt,err  :=  ioutil.ReadAll(file)
	json.Unmarshal(bt, &TipConfig.Arr)
	for _,conf := range TipConfig.Arr{
		TipConfig.Dic[conf.Id] = conf
	}
	
}
