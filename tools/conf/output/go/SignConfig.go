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

type SignConfigElem struct {
	Id int
	Name string
	Icon string
	Bg string
	Reward []int
	Nums []int
	
}

type SignConfig0 struct {
	Dic map[int]*SignConfigElem
	Arr []*SignConfigElem
}

var (
	SignConfig SignConfig0
)

func loadSignConfig(path string) {
	file, err := os.Open(path)
	defer func() {
		if file != nil {
			file.Close()
		}
	}()
	if err != nil {
		panic(fmt.Sprint("load config error, path=", path))
	}

	SignConfig.Dic = make(map[int]*SignConfigElem)
	SignConfig.Arr = make([]*SignConfigElem, 0, 32)

	bt,err  :=  ioutil.ReadAll(file)
	json.Unmarshal(bt, &SignConfig.Arr)
	for _,conf := range SignConfig.Arr{
		SignConfig.Dic[conf.Id] = conf
	}
	
}
