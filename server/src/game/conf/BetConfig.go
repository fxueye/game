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

type BetConfigElem struct {
	Id int
	GroupId int
	BetMoney int
	
}

type BetConfig0 struct {
	Dic map[int]*BetConfigElem
	Arr []*BetConfigElem
}

var (
	BetConfig BetConfig0
)

func loadBetConfig(path string) {
	file, err := os.Open(path)
	defer func() {
		if file != nil {
			file.Close()
		}
	}()
	if err != nil {
		panic(fmt.Sprint("load config error, path=", path))
	}

	BetConfig.Dic = make(map[int]*BetConfigElem)
	BetConfig.Arr = make([]*BetConfigElem, 0, 32)

	bt,err  :=  ioutil.ReadAll(file)
	json.Unmarshal(bt, &BetConfig.Arr)
	for _,conf := range BetConfig.Arr{
		BetConfig.Dic[conf.Id] = conf
	}
	
}
