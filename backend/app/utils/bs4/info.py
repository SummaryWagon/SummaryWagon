import urllib.request

def find_og_info(soup):
    
    og_title = soup.select_one('meta[property="og:title"]')['content']
    og_image = soup.select_one('meta[property="og:image"]')['content']
    og_desc = soup.select_one('meta[property="og:description"]')['content']
    
    with urllib.request.urlopen(og_image) as response:
        info = response.info()
        og_image_content_type = info.get_content_type()

    return {"og_title" : og_title, "og_image" : og_image, "og_desc" : og_desc, "og_image_content_type" : og_image_content_type}