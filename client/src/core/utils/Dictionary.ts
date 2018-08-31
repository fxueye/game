/**
 * 字典型的数据存取类。
 */
class Dictionary<T> {
	private m_keys: any[] = [];
	private m_values: T[] = [];
	/**
	 * key Array 默认排序 (注意 1,2,3,10 结果会是 1,10,2,3)
	 */
	public sort(){
		var temKeys:any[] = [];
		var temValues:any[] = [];
		for(var k of this.m_keys){
			temKeys.push(k);
		}
		temKeys = temKeys.sort();
		for(var k of temKeys){
			temValues.push(this.get(k));
		}
		this.m_keys = temKeys;
		this.m_values = temValues;
	}
	
	public get length(): number {
		return this.m_keys.length;
	}
	/**
	 * 获取所有的子元素列表。
	 */
	public get values(): T[] {
		return this.m_values.concat();
	}
	public containsKey(key:any):boolean{
		return this.m_keys.lastIndexOf(key) >= 0 ;
	}
	/**
	 * 获取所有的子元素键名列表。
	 */
	public get keys(): any[] {
		return this.m_keys.concat();
	}
	/**
	 * 获取指定对象的键名索引。
	 * @param	key 键名对象。
	 * @return 键名索引。
	 */
	public indexOfKey(key: any): number {
		return this.m_keys.indexOf(key);
	}

	public indexOfValue(val: T): number {
		return this.m_values.indexOf(val);
	}
	/**
	 * 通过value得到对应的key
	 */
	public getKeyByValue(value: T): any {
		return this.m_keys[this.indexOfValue(value)];
	}
	/**
	 * 添加指定键名的值。
	 * @param	key 键名。
	 * @param	value 值。
	 */
	public add(key: any, value: T): void {
		var index: number = this.indexOfKey(key);
		if (index >= 0) {
			this.m_values[index] = value;
		} else {
			this.m_keys.push(key);
			this.m_values.push(value);
		}
	}

	/**
	 * 返回指定键名的值。
	 * @param	key 键名对象。
	 * @return 指定键名的值。
	 */
	public get(key: any): T {
		var index: number = this.indexOfKey(key);
		if (index >= 0) {
			return this.m_values[index];
		}
		return null;
	}

	/**
	 * 移除指定键名的值。
	 * @param	key 键名对象。
	 * @return 是否成功移除。
	 */
	public remove(key: any): T {
		var index: number = this.indexOfKey(key);
		if (index >= 0) {
			this.m_keys.splice(index, 1);
			return this.m_values.splice(index, 1)[0];
		}
		return null;
	}

	public removeAt(index: number): T {
		if (index >= 0 && index < this.m_keys.length) {
			this.m_keys.splice(index, 1);
			return this.m_values.splice(index, 1)[0];
		}
		return null;
	}


	/**
	 * 清除此对象的键名列表和键值列表。
	 */
	public clear() {
		this.m_keys.length = 0;
		this.m_values.length = 0;
	}

	/**
	 * 随机获取一条数据
	 */
	public getRandomData(): T {
		var index: number = Math.random() * this.keys.length << 0;
		return this.m_values[index];
	}
}

