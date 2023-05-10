def find_og_info(soup):
    
    title = soup.select_one('meta[property="og:title"]')['content']
    image = soup.select_one('meta[property="og:image"]')['content']
    
    return [title, image]