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

type QuotesTreeConfigElem struct {
	Id int
	ParentId int
	Name string
	TextId int
	Type int
	ListId int
	
}

type QuotesTreeConfig0 struct {
	Dic map[int]*QuotesTreeConfigElem
	Arr []*QuotesTreeConfigElem
}

var (
	QuotesTreeConfig QuotesTreeConfig0
)

func loadQuotesTreeConfig(path string) {
	file, err := os.Open(path)
	defer func() {
		if file != nil {
			file.Close()
		}
	}()
	if err != nil {
		panic(fmt.Sprint("load config error, path=", path))
	}

	QuotesTreeConfig.Dic = make(map[int]*QuotesTreeConfigElem)
	QuotesTreeConfig.Arr = make([]*QuotesTreeConfigElem, 0, 32)

	bt,err  :=  ioutil.ReadAll(file)
	json.Unmarshal(bt, &QuotesTreeConfig.Arr)
	for _,conf := range QuotesTreeConfig.Arr{
		QuotesTreeConfig.Dic[conf.Id] = conf
	}
	
}
