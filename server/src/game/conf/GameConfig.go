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

type GameConfigElem struct {
	Id int
	Data string
	Des string
	
}

type GameConfig0 struct {
	Dic map[int]*GameConfigElem
	Arr []*GameConfigElem
}

var (
	GameConfig GameConfig0
)

func loadGameConfig(path string) {
	file, err := os.Open(path)
	defer func() {
		if file != nil {
			file.Close()
		}
	}()
	if err != nil {
		panic(fmt.Sprint("load config error, path=", path))
	}

	GameConfig.Dic = make(map[int]*GameConfigElem)
	GameConfig.Arr = make([]*GameConfigElem, 0, 32)

	bt,err  :=  ioutil.ReadAll(file)
	json.Unmarshal(bt, &GameConfig.Arr)
	for _,conf := range GameConfig.Arr{
		GameConfig.Dic[conf.Id] = conf
	}
	
}
