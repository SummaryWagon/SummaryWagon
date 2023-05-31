import urllib.request

def find_og_info(soup):
    
    title = soup.select_one('meta[property="og:title"]')['content']
    image = soup.select_one('meta[property="og:image"]')['content']
    
    with urllib.request.urlopen(image) as response:
        info = response.info()
        image_content_type = info.get_content_type()

    return [title, image, image_content_type]