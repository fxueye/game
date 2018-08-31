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

type PayConfigElem struct {
	Id int
	Sort int
	ProductId string
	ProductName string
	ProductDesc string
	Visible bool
	Hot bool
	MoneyType int
	MoneyCount int
	GiftMoneyCount int
	Price float32
	Currency string
	
}

type PayConfig0 struct {
	Dic map[int]*PayConfigElem
	Arr []*PayConfigElem
}

var (
	PayConfig PayConfig0
)

func loadPayConfig(path string) {
	file, err := os.Open(path)
	defer func() {
		if file != nil {
			file.Close()
		}
	}()
	if err != nil {
		panic(fmt.Sprint("load config error, path=", path))
	}

	PayConfig.Dic = make(map[int]*PayConfigElem)
	PayConfig.Arr = make([]*PayConfigElem, 0, 32)

	bt,err  :=  ioutil.ReadAll(file)
	json.Unmarshal(bt, &PayConfig.Arr)
	for _,conf := range PayConfig.Arr{
		PayConfig.Dic[conf.Id] = conf
	}
	
}
