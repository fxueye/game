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

type RandomNameElem struct {
	Id int
	PlayerName string
	PlayerNameTw string
	PlayerNameEn string
	
}

type RandomName0 struct {
	Dic map[int]*RandomNameElem
	Arr []*RandomNameElem
}

var (
	RandomName RandomName0
)

func loadRandomName(path string) {
	file, err := os.Open(path)
	defer func() {
		if file != nil {
			file.Close()
		}
	}()
	if err != nil {
		panic(fmt.Sprint("load config error, path=", path))
	}

	RandomName.Dic = make(map[int]*RandomNameElem)
	RandomName.Arr = make([]*RandomNameElem, 0, 32)

	bt,err  :=  ioutil.ReadAll(file)
	json.Unmarshal(bt, &RandomName.Arr)
	for _,conf := range RandomName.Arr{
		RandomName.Dic[conf.Id] = conf
	}
	
}
