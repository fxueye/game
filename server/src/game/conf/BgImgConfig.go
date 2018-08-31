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

type BgImgConfigElem struct {
	Id int
	Name string
	Location []int
	Des string
	
}

type BgImgConfig0 struct {
	Dic map[int]*BgImgConfigElem
	Arr []*BgImgConfigElem
}

var (
	BgImgConfig BgImgConfig0
)

func loadBgImgConfig(path string) {
	file, err := os.Open(path)
	defer func() {
		if file != nil {
			file.Close()
		}
	}()
	if err != nil {
		panic(fmt.Sprint("load config error, path=", path))
	}

	BgImgConfig.Dic = make(map[int]*BgImgConfigElem)
	BgImgConfig.Arr = make([]*BgImgConfigElem, 0, 32)

	bt,err  :=  ioutil.ReadAll(file)
	json.Unmarshal(bt, &BgImgConfig.Arr)
	for _,conf := range BgImgConfig.Arr{
		BgImgConfig.Dic[conf.Id] = conf
	}
	
}
