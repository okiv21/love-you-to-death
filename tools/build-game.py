"""Build the one-file Editor script and the matching standalone runtime."""
from pathlib import Path
root=Path(__file__).resolve().parent.parent
parts=['district.js','world-art.js','interface.js','mechanics.js','demo.js']
source='\n\n'.join((root/'playcanvas/src'/part).read_text() for part in parts)
for target in ['playcanvas/midnight-grounds.js','dist/sandbox/midnight-grounds.js']:
 (root/target).write_text(source)
print('Built Editor and standalone script from source modules.')
