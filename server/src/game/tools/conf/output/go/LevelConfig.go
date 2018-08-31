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

type LevelConfigElem struct {
	Id int
	Exp int
	
}

type LevelConfig0 struct {
	Dic map[int]*LevelConfigElem
	Arr []*LevelConfigElem
}

var (
	LevelConfig LevelConfig0
)

func loadLevelConfig(path string) {
	file, err := os.Open(path)
	defer func() {
		if file != nil {
			file.Close()
		}
	}()
	if err != nil {
		panic(fmt.Sprint("load config error, path=", path))
	}

	LevelConfig.Dic = make(map[int]*LevelConfigElem)
	LevelConfig.Arr = make([]*LevelConfigElem, 0, 32)

	bt,err  :=  ioutil.ReadAll(file)
	json.Unmarshal(bt, &LevelConfig.Arr)
	for _,conf := range LevelConfig.Arr{
		LevelConfig.Dic[conf.Id] = conf
	}
	
}
