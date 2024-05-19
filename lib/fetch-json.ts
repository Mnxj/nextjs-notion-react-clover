const API_URL = process.env.NEXT_PUBLIC_DOMAIN_WHITELIST;

const fetchJson = (fileName:string) => fetch(`${API_URL}/${fileName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP 错误! 状态码: ${response.status}`);
            }
            return response.json();
        })

export const getCache = async (fileName:string) => {
    try {
        const data = await fetchJson(fileName);
        return data['value'];;
      } catch (error) {
        console.error('出错啦:', error);
      }
}

export const getCaches = async (fileName:string, cacheKey:string) => {
  try {
      const data = await fetchJson(fileName);
      return data.find(item=> item['id'] === cacheKey)?.['value'];
    } catch (error) {
      console.error('出错啦:', error);
    }
}

export const getIdCache = async (fileName:string,key: string,cacheKey:string) => {
  try {
      const data = await fetchJson(fileName);
      return data.find(item=> item[key] === cacheKey)?.['id'];
    } catch (error) {
      console.error('出错啦:', error);
    }
}