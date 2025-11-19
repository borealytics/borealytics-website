import struct
import sys
import os

def read_ase(filepath):
    with open(filepath, 'rb') as f:
        data = f.read()

    if data[0:4] != b'ASEF':
        print("Error: Not an ASE file")
        return

    # Version is at 4:8 (4 bytes total)
    # Num blocks is at 8:12
    num_blocks = struct.unpack('>I', data[8:12])[0]
    print(f"Num Blocks: {num_blocks}")
    
    offset = 12
    extracted = []

    while offset < len(data):
        if offset + 6 > len(data): break
        
        block_type = struct.unpack('>H', data[offset:offset+2])[0]
        offset += 2
        block_len = struct.unpack('>I', data[offset:offset+4])[0]
        offset += 4
        
        next_block = offset + block_len
        # print(f"Block Type: {hex(block_type)}, Len: {block_len}")

        if block_type == 0x0001: # Color
            # Name length
            name_len = struct.unpack('>H', data[offset:offset+2])[0]
            offset += 2
            # Name (UTF-16BE)
            name = data[offset:offset + (name_len-1)*2].decode('utf-16be')
            offset += name_len * 2
            
            # Color Model
            model = data[offset:offset+4].decode('ascii').strip()
            offset += 4
            
            # Color Values
            if model == 'RGB':
                r = struct.unpack('>f', data[offset:offset+4])[0]
                g = struct.unpack('>f', data[offset+4:offset+8])[0]
                b = struct.unpack('>f', data[offset+8:offset+12])[0]
                hex_code = '#{:02x}{:02x}{:02x}'.format(int(r*255), int(g*255), int(b*255))
                extracted.append(f"{name}: {hex_code}")
            elif model == 'CMYK':
                c = struct.unpack('>f', data[offset:offset+4])[0]
                m = struct.unpack('>f', data[offset+4:offset+8])[0]
                y = struct.unpack('>f', data[offset+8:offset+12])[0]
                k = struct.unpack('>f', data[offset+12:offset+16])[0]
                r = 255 * (1-c) * (1-k)
                g = 255 * (1-m) * (1-k)
                b = 255 * (1-y) * (1-k)
                hex_code = '#{:02x}{:02x}{:02x}'.format(int(r), int(g), int(b))
                extracted.append(f"{name} (from CMYK): {hex_code}")
            elif model == 'Gray':
                gray = struct.unpack('>f', data[offset:offset+4])[0]
                val = int(gray * 255)
                hex_code = '#{:02x}{:02x}{:02x}'.format(val, val, val)
                extracted.append(f"{name}: {hex_code}")
        
        offset = next_block

    for c in extracted:
        print(c)

if __name__ == "__main__":
    read_ase(sys.argv[1])
