import socket
domains = [
    'harshalengineering.com', 
    'hesengineering.com', 
    'hes-consultants.com', 
    'harshalengg.com', 
    'hes-design.com', 
    'hesindia.in', 
    'hes-projects.com', 
    'hespiping.com', 
    'harshalpipingdesign.com'
]
for d in domains:
    try:
        socket.gethostbyname(d)
        print(f"{d} : TAKEN")
    except:
        print(f"{d} : LIKELY AVAILABLE")
