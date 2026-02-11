from PIL import Image, ImageDraw, ImageFont
import os

def create_favicon():
    # Settings
    size = (64, 64)
    bg_color = "#2563eb" # Primary blue from variables.css
    text_color = "white"
    text = "R"
    
    # Create image with transparent background
    img = Image.new('RGBA', size, (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    
    # Draw blue circle
    # The bounding box is [x0, y0, x1, y1]
    d.ellipse([(0, 0), (size[0]-1, size[1]-1)], fill=bg_color)
    
    # Load default font
    try:
        # Try to load Arial or similar
        font = ImageFont.truetype("arial.ttf", 40)
    except IOError:
        # Fallback to default
        font = ImageFont.load_default()
        
    # Calculate text position to center it
    bbox = d.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    x = (size[0] - text_width) / 2
    y = (size[1] - text_height) / 2 - 4 # Adjust slightly up
    
    d.text((x, y), text, fill=text_color, font=font)
    
    # Ensure assets directory exists
    output_dir = "assets"
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    # Save image
    output_path = os.path.join(output_dir, "favicon.png")
    img.save(output_path)
    print(f"Favicon saved to {output_path}")

if __name__ == "__main__":
    create_favicon()
