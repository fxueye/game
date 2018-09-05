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

type ShopConfigElem struct {
	Id int
	ItemId int
	ItemCount int
	Name string
	Propaganda string
	Type int
	Tabid int
	Order int
	Cost int
	Price int
	PurchaseNums int
	Scale float32
	Location []int
	NewStar string
	NewEnd string
	
}

type ShopConfig0 struct {
	Dic map[int]*ShopConfigElem
	Arr []*ShopConfigElem
}

var (
	ShopConfig ShopConfig0
)

func loadShopConfig(path string) {
	file, err := os.Open(path)
	defer func() {
		if file != nil {
			file.Close()
		}
	}()
	if err != nil {
		panic(fmt.Sprint("load config error, path=", path))
	}

	ShopConfig.Dic = make(map[int]*ShopConfigElem)
	ShopConfig.Arr = make([]*ShopConfigElem, 0, 32)

	bt,err  :=  ioutil.ReadAll(file)
	json.Unmarshal(bt, &ShopConfig.Arr)
	for _,conf := range ShopConfig.Arr{
		ShopConfig.Dic[conf.Id] = conf
	}
	
}
