package main

import (
	"flag"
	"fmt"
	"github.com/tealeg/xlsx"
	"io/ioutil"
	"os"
	"path/filepath"
	"sort"
	"strings"
	"text/template"
)

var (
	inputPath       string
	outputPath      string
	tmpJsonPath     string
	tmpTSPath       string
	tmpTSLoaderPath string
	tmpCPath 		string
	tmpCLoaderPath 	string
	tmpGoPath 		string
	tmpGoLoaderPath string
	translatePath   string
)

func main() {

	input_path := flag.String("I", "./input", "configure input path")
	output_path := flag.String("O", "./output", "configure output path")
	temp_path := flag.String("T", "./temp_conf", "configure template path")
	flag.Parse()

	inputPath, _ = filepath.Abs(*input_path)
	fmt.Printf("input_path=%s\n", inputPath)

	outputPath, _ = filepath.Abs(*output_path)
	fmt.Printf("output_path=%s\n", outputPath)

	tmpJsonPath, _ = filepath.Abs(fmt.Sprintf("%s%c%s", *temp_path, os.PathSeparator, "tmp_json.txt"))
	fmt.Printf("temp_json_path=%s\n", tmpJsonPath)

	tmpTSPath, _ = filepath.Abs(fmt.Sprintf("%s%c%s", *temp_path, os.PathSeparator, "tmp_ts.txt"))
	fmt.Printf("temp_ts_path=%s\n", tmpTSPath)

	tmpTSLoaderPath, _ = filepath.Abs(fmt.Sprintf("%s%c%s", *temp_path, os.PathSeparator, "tmp_ts_loader.txt"))
	fmt.Printf("temp_ts_loader_path=%s\n", tmpTSLoaderPath)

	tmpCPath, _ = filepath.Abs(fmt.Sprintf("%s%c%s", *temp_path, os.PathSeparator, "tmp_c.txt"))
	fmt.Printf("temp_c_path=%s\n", tmpCPath)

	tmpCLoaderPath, _ = filepath.Abs(fmt.Sprintf("%s%c%s", *temp_path, os.PathSeparator, "tmp_c_loader.txt"))
	fmt.Printf("temp_c_loader_path=%s\n", tmpCLoaderPath)

	tmpGoPath, _ = filepath.Abs(fmt.Sprintf("%s%c%s", *temp_path, os.PathSeparator, "tmp_go.txt"))
	fmt.Printf("temp_go_path=%s\n", tmpGoPath)

	tmpGoLoaderPath, _ = filepath.Abs(fmt.Sprintf("%s%c%s", *temp_path, os.PathSeparator, "tmp_go_loader.txt"))
	fmt.Printf("temp_go_loader_path=%s\n", tmpGoLoaderPath)

	translatePath, _ = filepath.Abs(fmt.Sprintf("%s%c%s", outputPath, os.PathSeparator, "LangConf.txt"))
	fmt.Printf("translate_text_path=%s\n", translatePath)

	if !IsExist(inputPath) {
		panic(fmt.Sprintf("input path not exists: %s", inputPath))
	}
	if !IsExist(tmpJsonPath) {
		panic(fmt.Sprintf("json template path not exists: %s", tmpJsonPath))
	}
	if !IsExist(tmpTSPath) {
		panic(fmt.Sprintf("ts template path not exists: %s", tmpTSPath))
	}
	if !IsExist(tmpTSLoaderPath) {
		panic(fmt.Sprintf("ts loader template path not exists: %s", tmpTSLoaderPath))
	}
	if !IsExist(tmpCPath) {
		panic(fmt.Sprintf("c++ template path not exists: %s", tmpCPath))
	}
	if !IsExist(tmpCLoaderPath) {
		panic(fmt.Sprintf("c++ loader template path not exists: %s", tmpCLoaderPath))
	}
	if outputPath == "" {
		panic(fmt.Sprintf("invalid output path: %s", outputPath))
	}
	if IsExist(outputPath) {
		os.RemoveAll(outputPath)
	}
	jsonPath := fmt.Sprintf("%s%c%s", outputPath, os.PathSeparator, "json")
	tsPath := fmt.Sprintf("%s%c%s", outputPath, os.PathSeparator, "ts")
	cPath := fmt.Sprintf("%s%c%s", outputPath, os.PathSeparator, "cpp")
	goPath := fmt.Sprintf("%s%c%s", outputPath, os.PathSeparator, "go")
	

	os.MkdirAll(jsonPath, 0755)
	os.MkdirAll(tsPath, 0755)
	os.MkdirAll(cPath, 0755)
	os.MkdirAll(goPath, 0755)

	confNames := make([]string, 0, 32)
	textMap := make(map[string]bool)
	fmt.Printf("build config :-------------------------\n")
	dir, _ := ioutil.ReadDir(inputPath)
	for _, fi := range dir {
		if fi.IsDir() {
			continue
		}

		name := fi.Name()
		fmt.Printf("build config: %s\n", name)

		ext := filepath.Ext(name)
		clzName := name[:strings.Index(name, ".")]

		if name == "" || name[0] == '~' || name[0] == '.' {
			continue
		}
		if ext != ".xls" && ext != ".xlsx" {
			continue
		}

		conf := ParseFile(fmt.Sprintf("%s%c%s", inputPath, os.PathSeparator, fi.Name()), clzName, textMap)
		CreateFile(fmt.Sprintf("%s%c%s.json", jsonPath, os.PathSeparator, strings.ToLower(clzName)), tmpJsonPath, conf)
		CreateFile(fmt.Sprintf("%s%c%s.ts", tsPath, os.PathSeparator, clzName), tmpTSPath, conf)
		CreateFile(fmt.Sprintf("%s%c%s.h", cPath, os.PathSeparator, clzName), tmpCPath, conf)
		CreateFile(fmt.Sprintf("%s%c%s.go", goPath, os.PathSeparator, clzName), tmpGoPath, conf)

		confNames = append(confNames, clzName)
	}

	CreateFile(fmt.Sprintf("%s%c%s.ts", tsPath, os.PathSeparator, "ConfLoader"), tmpTSLoaderPath, confNames)
	CreateFile(fmt.Sprintf("%s%c%s.h", cPath, os.PathSeparator, "ConfLoader"), tmpCLoaderPath, confNames)
	CreateFile(fmt.Sprintf("%s%c%s.go", goPath, os.PathSeparator, "ConfLoader"), tmpGoLoaderPath, confNames)
	fmt.Println("----------------------------------\n")

	CreateTranslateFile(textMap, translatePath)
}

func IsExist(path string) bool {
	_, err := os.Stat(path)
	return err == nil || os.IsExist(err)
}

type ConfData struct {
	ClzName       string
	ConfNames     []string
	ConfTypes     []string
	ConfIsArrays  []bool
	ConfDatas     [][]string
	NeedTranslate []bool
	Hide          []bool
}

func CreateTranslateFile(textMap map[string]bool, path string) {
	f, _ := os.Create(path)
	defer func() {
		if f != nil {
			f.Close()
		}
	}()
	texts := make([]string, 0, len(textMap))
	for k, _ := range textMap {
		texts = append(texts, k)
	}
	sort.Strings(texts)

	for _, k := range texts {
		f.WriteString(fmt.Sprintln(k))
	}
}

func CreateFile(path string, tmpPath string, data interface{}) {
	f, _ := os.Create(path)
	defer func() {
		if f != nil {
			f.Close()
		}
	}()
	name := filepath.Base(tmpPath)
	t := template.New(name)
	_, err := t.Funcs(registerFunc()).ParseFiles(tmpPath)
	if err != nil {
		panic(err)
	}
	err = t.Execute(f, data)
	if err != nil {
		panic(err)
	}
}

func ParseFile(path string, clzName string, textMap map[string]bool) *ConfData {
	xlFile, err := xlsx.OpenFile(path)
	if err != nil {
		panic(fmt.Sprint("cannot open file: ", path))
	}
	sheet := xlFile.Sheets[0]

	data := &ConfData{
		clzName,
		make([]string, 0, 32),
		make([]string, 0, 32),
		make([]bool, 0, 32),
		make([][]string, 0, 32),
		make([]bool, 0, 32),
		make([]bool, 0, 32),
	}
	for _, cell := range sheet.Rows[0].Cells {
		v := cell.Value
		if v == "" {
			break
		}

		data.NeedTranslate = append(data.NeedTranslate, v[0] == 'T')
		data.Hide = append(data.Hide, v[0] == 'H')
	}
	for _, cell := range sheet.Rows[1].Cells {

		v := cell.Value
		if v == "" {
			break
		}

		data.ConfNames = append(data.ConfNames, fmt.Sprint(strings.ToUpper(v[:1]), v[1:]))
	}
	for _, cell := range sheet.Rows[2].Cells {
		v := cell.Value
		if v == "" {
			break
		}
		if strings.Index(cell.Value, "[]") > 0 {
			data.ConfIsArrays = append(data.ConfIsArrays, true)
			data.ConfTypes = append(data.ConfTypes, cell.Value[:strings.Index(cell.Value, "[]")])
		} else {
			data.ConfIsArrays = append(data.ConfIsArrays, false)
			data.ConfTypes = append(data.ConfTypes, cell.Value)
		}

	}
	if len(data.ConfNames) != len(data.ConfTypes) {
		panic("configure len(names) != len(types)")
	}

	length := len(data.ConfNames)
	for r, row := range sheet.Rows {
		if r < 3 {
			continue
		}
		if len(row.Cells) == 0 || row.Cells[0] == nil || row.Cells[0].Value == "" {
			break
		}
		d := make([]string, length)
		for i := 0; i < length; i++ {
			if data.ConfIsArrays[i] {
				if i < len(row.Cells) && row.Cells[i].Value != "" {
					strs := strings.Split(row.Cells[i].Value, ",")
					ss := make([]string, len(strs))
					for j := 0; j < len(strs); j++ {
						ss[j] = GetValueText(strs[j], data.ConfTypes[i])
						if data.NeedTranslate[i] {
							textMap[strs[j]] = true
						}
					}
					d[i] = strings.Join(ss, ",")
				} else {
					d[i] = ""
				}
			} else {
				cellValue := ""
				if i < len(row.Cells) {
					cellValue = row.Cells[i].Value
				}
				d[i] = GetValueText(cellValue, data.ConfTypes[i])
				if data.NeedTranslate[i] {
					textMap[row.Cells[i].Value] = true
				}
			}
		}
		data.ConfDatas = append(data.ConfDatas, d)
	}

	return data
}

func GetValueText(v string, t string) string {
	switch t {
	case "bool":
		if v != "0" && v != "FALSE" && v != "false" {
			return "true"
		}
		return "false"
	case "string":
		v = strings.Replace(v, "\\", "\\\\", -1)
		v = strings.Replace(v, "\"", "\\\"", -1)
		return fmt.Sprint("\"", v, "\"")
	case "float":
		if v == "" {
			return ""
		}
		if strings.Index(v, ".") < 0 {
			return fmt.Sprint(v, ".0")
		}
		return v
	case "int":
		if v == "" {
			return "0"
		}
		return v
	default:
		return v
	}
}
func registerFunc() template.FuncMap {
	funcs := template.FuncMap{}
	funcs["getTsType"] = GetTsType
	funcs["getCType"] = GetCType
	funcs["add"] = Add
	funcs["less"] = Less
	funcs["toLower"] = ToLower
	funcs["toUpper"] = ToUpper
	funcs["ucFirst"] = UcFirst
	return funcs
}
func UcFirst(s string) string{
	return fmt.Sprint(strings.ToUpper(s[:1]), s[1:])
}
func Add(a, b int) int {
	return a + b
}
func Less(a, b int) int {
	return a - b
}
func ToLower(s string) string {
	return strings.ToLower(s)
}
func ToUpper(s string) string {
	return strings.ToUpper(s)
}
func GetTsType(t string) string {
	switch t {
	case "bool":
		return "boolean"
	case "long":
		return "number"
	case "int":
		return "number"
	case "float":
		return "number"
	case "string":
		return "string"
	default:
		return t
	}
}
func GetCType(t string) string {
	switch t {
	case "bool":
		return "bool"
	case "int":
		return "int"
	case "float":
		return "float"
	case "string":
		return "string"
	case "long":
		return "int64"
	default:
		return t
	}
}