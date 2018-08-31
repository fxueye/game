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

type TextConfigElem struct {
	Id int
	Text string
	
}

type TextConfig0 struct {
	Dic map[int]*TextConfigElem
	Arr []*TextConfigElem
}

var (
	TextConfig TextConfig0
)

func loadTextConfig(path string) {
	file, err := os.Open(path)
	defer func() {
		if file != nil {
			file.Close()
		}
	}()
	if err != nil {
		panic(fmt.Sprint("load config error, path=", path))
	}

	TextConfig.Dic = make(map[int]*TextConfigElem)
	TextConfig.Arr = make([]*TextConfigElem, 0, 32)

	bt,err  :=  ioutil.ReadAll(file)
	json.Unmarshal(bt, &TextConfig.Arr)
	for _,conf := range TextConfig.Arr{
		TextConfig.Dic[conf.Id] = conf
	}
	
}
