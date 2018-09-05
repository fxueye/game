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

type RoomConfigElem struct {
	Id int
	TotalType int
	Name string
	CompetitionIds []int
	StockName string
	IsOpen int
	DayType int
	
}

type RoomConfig0 struct {
	Dic map[int]*RoomConfigElem
	Arr []*RoomConfigElem
}

var (
	RoomConfig RoomConfig0
)

func loadRoomConfig(path string) {
	file, err := os.Open(path)
	defer func() {
		if file != nil {
			file.Close()
		}
	}()
	if err != nil {
		panic(fmt.Sprint("load config error, path=", path))
	}

	RoomConfig.Dic = make(map[int]*RoomConfigElem)
	RoomConfig.Arr = make([]*RoomConfigElem, 0, 32)

	bt,err  :=  ioutil.ReadAll(file)
	json.Unmarshal(bt, &RoomConfig.Arr)
	for _,conf := range RoomConfig.Arr{
		RoomConfig.Dic[conf.Id] = conf
	}
	
}
