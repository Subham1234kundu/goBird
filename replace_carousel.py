import os

file_path = '/Users/debanjanmalakar/Downloads/goBird-main/app/services/page.tsx'

new_content = """               {mobileSlides.map((slide, index) => (
                <div 
                   key={index}
                   className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                  <Image
                    src={slide.image}
                    alt={slide.category}
                    fill
                    className="object-cover"
                    quality={90}
                    priority={index === 0}
                  />
                  
                  {/* Glass Effect & Overlay */}
                  <div 
                    className="absolute inset-0 z-10"
                    style={{
                        background: 'linear-gradient(270deg, rgba(255, 255, 255, 0.0075) -20%, rgba(40, 40, 40, 0.0933904) 75.76%, rgba(255, 255, 255, 0.0075) 123.64%)',
                        backgroundBlendMode: 'overlay',
                    }}
                  ></div>
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>

                  <div className="absolute top-14 left-4 right-4 z-20 text-white">
                    <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full w-fit mb-4">
                      <p className="text-[10px] font-medium uppercase tracking-wider" style={{ fontFamily: 'Montserrat' }}>{slide.category}</p>
                    </div>
                    <h3 className="text-3xl font-light leading-tight mb-2" style={{ fontFamily: 'Montserrat', fontWeight: 400 }}>
                      {slide.title}
                    </h3>
                     <p className="text-sm mt-4 font-light leading-relaxed h-[60px] overflow-hidden" style={{ fontFamily: 'Montserrat' }}>
                        {slide.description}
                    </p>
                  </div>

                  <div className="absolute bottom-6 left-4 right-4 z-20">
                    <div className="flex flex-col gap-3 mb-6 pl-2">
                       {slide.list.map((item, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                            <p className="text-sm font-light text-white/90" style={{ fontFamily: 'Inter' }}>{item}</p>
                          </div>
                       ))}
                    </div>
                    
                    <button 
                      className="w-full bg-white text-black py-3 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
                      onClick={() => router.push(slide.route)}
                      style={{ fontFamily: 'Montserrat' }}
                    >
                      {slide.buttonText}
                    </button>
                  </div>
                </div>
              ))}"""

with open(file_path, 'r') as f:
    lines = f.readlines()

start_index = -1
end_index = -1

# Find the start: lines containing "Screen Content - using M1 image content styles"
for i, line in enumerate(lines):
    if "Screen Content - using M1 image content styles" in line:
        # The content to replace starts AFTER the div on the next line
        # line i is the comment
        # line i+1 is the opening div
        # line i+2 is where we want to start replacing (the Image)
        start_index = i + 2
        break

# Find the end: look for "Book a Strategy Session" and then find the closing div
if start_index != -1:
    for i in range(start_index, len(lines)):
        if "Book a Strategy Session" in lines[i]:
            # The closing div for the button container is i+2 (usually)
            # The closing div for the main screen content is i+3 (usually)
            # Let's verify by counting braces or indentation
            # Based on view_file:
            # i: Book a Strategy Session
            # i+1: </button>
            # i+2: </div> (button container)
            # i+3: </div> (screen content) -> this is the bound to keep
            end_index = i + 2 
            break

if start_index != -1 and end_index != -1:
    print(f"Replacing lines {start_index} to {end_index}")
    # We replace from start_index (inclusive) to end_index (inclusive)
    # The new content replaces this range
    
    # Actually, let's double check indentation of the closing div
    # The closing div at end_index is lines[end_index]. We should NOT include lines[end_index+1] which is the closing div of the parent.
    # The view_file showed:
    # 1109: </div>
    # 1110: </div>
    # My target replacement ends with `))}` which closes the map, and stays INSIDE the `div` from line 1066.
    # So I want to remove everything inside line 1066.
    # line 1066 is lines[start_index-1]
    # line 1110 is lines[end_index+1] ?
    
    # range to delete: lines inside the div.
    # Start: line containing <Image ... (start_index)
    # End: line containing </div> that closes the button container (end_index).
    
    new_lines = lines[:start_index] + [new_content + "\n"] + lines[end_index+1:]
    
    with open(file_path, 'w') as f:
        f.writelines(new_lines)
    print("Successfully replaced content.")
else:
    print("Could not find start or end markers.")
