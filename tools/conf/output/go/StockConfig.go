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

type StockConfigElem struct {
	Id int
	Ukey int
	Market_id int
	Major_type int
	Minor_type int
	Market_code int
	Market_abbr string
	Chinese_name string
	English_name string
	List_date string
	Delist_date string
	Currency_id string
	Jy_code string
	Wind_code string
	Input_code string
	Last_update string
	Show int
	
}

type StockConfig0 struct {
	Dic map[int]*StockConfigElem
	Arr []*StockConfigElem
}

var (
	StockConfig StockConfig0
)

func loadStockConfig(path string) {
	file, err := os.Open(path)
	defer func() {
		if file != nil {
			file.Close()
		}
	}()
	if err != nil {
		panic(fmt.Sprint("load config error, path=", path))
	}

	StockConfig.Dic = make(map[int]*StockConfigElem)
	StockConfig.Arr = make([]*StockConfigElem, 0, 32)

	bt,err  :=  ioutil.ReadAll(file)
	json.Unmarshal(bt, &StockConfig.Arr)
	for _,conf := range StockConfig.Arr{
		StockConfig.Dic[conf.Id] = conf
	}
	
}
