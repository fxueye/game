var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 字典型的数据存取类。
 */
var Dictionary = (function () {
    function Dictionary() {
        this.m_keys = [];
        this.m_values = [];
    }
    /**
     * key Array 默认排序 (注意 1,2,3,10 结果会是 1,10,2,3)
     */
    Dictionary.prototype.sort = function () {
        var temKeys = [];
        var temValues = [];
        for (var _i = 0, _a = this.m_keys; _i < _a.length; _i++) {
            var k = _a[_i];
            temKeys.push(k);
        }
        temKeys = temKeys.sort();
        for (var _b = 0, temKeys_1 = temKeys; _b < temKeys_1.length; _b++) {
            var k = temKeys_1[_b];
            temValues.push(this.get(k));
        }
        this.m_keys = temKeys;
        this.m_values = temValues;
    };
    Object.defineProperty(Dictionary.prototype, "length", {
        get: function () {
            return this.m_keys.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dictionary.prototype, "values", {
        /**
         * 获取所有的子元素列表。
         */
        get: function () {
            return this.m_values.concat();
        },
        enumerable: true,
        configurable: true
    });
    Dictionary.prototype.containsKey = function (key) {
        return this.m_keys.lastIndexOf(key) >= 0;
    };
    Object.defineProperty(Dictionary.prototype, "keys", {
        /**
         * 获取所有的子元素键名列表。
         */
        get: function () {
            return this.m_keys.concat();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 获取指定对象的键名索引。
     * @param	key 键名对象。
     * @return 键名索引。
     */
    Dictionary.prototype.indexOfKey = function (key) {
        return this.m_keys.indexOf(key);
    };
    Dictionary.prototype.indexOfValue = function (val) {
        return this.m_values.indexOf(val);
    };
    /**
     * 通过value得到对应的key
     */
    Dictionary.prototype.getKeyByValue = function (value) {
        return this.m_keys[this.indexOfValue(value)];
    };
    /**
     * 添加指定键名的值。
     * @param	key 键名。
     * @param	value 值。
     */
    Dictionary.prototype.add = function (key, value) {
        var index = this.indexOfKey(key);
        if (index >= 0) {
            this.m_values[index] = value;
        }
        else {
            this.m_keys.push(key);
            this.m_values.push(value);
        }
    };
    /**
     * 返回指定键名的值。
     * @param	key 键名对象。
     * @return 指定键名的值。
     */
    Dictionary.prototype.get = function (key) {
        var index = this.indexOfKey(key);
        if (index >= 0) {
            return this.m_values[index];
        }
        return null;
    };
    /**
     * 移除指定键名的值。
     * @param	key 键名对象。
     * @return 是否成功移除。
     */
    Dictionary.prototype.remove = function (key) {
        var index = this.indexOfKey(key);
        if (index >= 0) {
            this.m_keys.splice(index, 1);
            return this.m_values.splice(index, 1)[0];
        }
        return null;
    };
    Dictionary.prototype.removeAt = function (index) {
        if (index >= 0 && index < this.m_keys.length) {
            this.m_keys.splice(index, 1);
            return this.m_values.splice(index, 1)[0];
        }
        return null;
    };
    /**
     * 清除此对象的键名列表和键值列表。
     */
    Dictionary.prototype.clear = function () {
        this.m_keys.length = 0;
        this.m_values.length = 0;
    };
    /**
     * 随机获取一条数据
     */
    Dictionary.prototype.getRandomData = function () {
        var index = Math.random() * this.keys.length << 0;
        return this.m_values[index];
    };
    return Dictionary;
}());
__reflect(Dictionary.prototype, "Dictionary");
//# sourceMappingURL=Dictionary.js.map