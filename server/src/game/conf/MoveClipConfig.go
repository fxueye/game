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

type MoveClipConfigElem struct {
	Id int
	Texture string
	Config string
	Name string
	Play string
	FrameRate float32
	Times int
	Location []int
	Scale []float32
	
}

type MoveClipConfig0 struct {
	Dic map[int]*MoveClipConfigElem
	Arr []*MoveClipConfigElem
}

var (
	MoveClipConfig MoveClipConfig0
)

func loadMoveClipConfig(path string) {
	file, err := os.Open(path)
	defer func() {
		if file != nil {
			file.Close()
		}
	}()
	if err != nil {
		panic(fmt.Sprint("load config error, path=", path))
	}

	MoveClipConfig.Dic = make(map[int]*MoveClipConfigElem)
	MoveClipConfig.Arr = make([]*MoveClipConfigElem, 0, 32)

	bt,err  :=  ioutil.ReadAll(file)
	json.Unmarshal(bt, &MoveClipConfig.Arr)
	for _,conf := range MoveClipConfig.Arr{
		MoveClipConfig.Dic[conf.Id] = conf
	}
	
}
