package wx

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net"
	"net/http"
	"net/http/cookiejar"
	"net/url"
	"time"
)

type Client struct {
	client    *http.Client
	userAgent string
	cookies   []*http.Cookie
}

type Header map[string]string

func NewClient() *Client {
	var netTransport = &http.Transport{
		Proxy: http.ProxyFromEnvironment,
		Dial:  (&net.Dialer{Timeout: 100 * time.Second}).Dial,
		// TLSClientConfig:     &tls.Config{InsecureSkipVerify: true},
		// TLSHandshakeTimeout: 100 * time.Second,
	}
	cookieJar, _ := cookiejar.New(nil)

	httpClient := &http.Client{
		Timeout:   time.Second * 100,
		Transport: netTransport,
		Jar:       cookieJar,
	}

	return &Client{
		client:    httpClient,
		userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36",
	}
}
func (c *Client) Cookies() []*http.Cookie {
	return c.cookies
}
func (c *Client) Get(url string, data *url.Values) ([]byte, error) {
	if data != nil {
		url = url + "?" + data.Encode()
	}
	return c.fetch("GET", url, []byte(""), Header{})
}

func (c *Client) Post(url string, data *url.Values) ([]byte, error) {
	return c.fetch("POST", url, []byte(data.Encode()), Header{"Content-Type": "application/x-www-form-urlencoded"})
}

func (c *Client) PostJson(url string, m map[string]interface{}) ([]byte, error) {
	jsonString, err := json.Marshal(m)
	if err != nil {
		return nil, err
	}
	return c.fetch("POST", url, jsonString, Header{"Content-Type": "application/json; charset=UTF-8"})
}

func (c *Client) fetchReponse(method string, uri string, body []byte, headers map[string]string) (*http.Response, error) {
	req, err := http.NewRequest(method, uri, bytes.NewBuffer(body))
	if err != nil {
		return nil, err
	}
	req.Header.Set("User-Agent", c.userAgent)
	c.cookies = c.client.Jar.Cookies(req.URL)
	for k, v := range headers {
		req.Header.Set(k, v)
	}
	return c.client.Do(req)
}

func (c *Client) fetch(method string, uri string, body []byte, headers Header) ([]byte, error) {
	resp, err := c.fetchReponse(method, uri, body, headers)
	if err != nil {
		return nil, err
	}

	defer resp.Body.Close()

	b, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}
	return b, nil
}
