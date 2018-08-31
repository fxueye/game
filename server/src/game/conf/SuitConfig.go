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

type SuitConfigElem struct {
	Id int
	Name string
	Parts []int
	
}

type SuitConfig0 struct {
	Dic map[int]*SuitConfigElem
	Arr []*SuitConfigElem
}

var (
	SuitConfig SuitConfig0
)

func loadSuitConfig(path string) {
	file, err := os.Open(path)
	defer func() {
		if file != nil {
			file.Close()
		}
	}()
	if err != nil {
		panic(fmt.Sprint("load config error, path=", path))
	}

	SuitConfig.Dic = make(map[int]*SuitConfigElem)
	SuitConfig.Arr = make([]*SuitConfigElem, 0, 32)

	bt,err  :=  ioutil.ReadAll(file)
	json.Unmarshal(bt, &SuitConfig.Arr)
	for _,conf := range SuitConfig.Arr{
		SuitConfig.Dic[conf.Id] = conf
	}
	
}
