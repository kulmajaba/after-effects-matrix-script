# After Effects Matrix Title Effect

## Quickstart

0. Download and install Matrix Code NFI font and download the contents of this repository
1. Add the contents of preset.xml (which define the pseudo effect controls) to PresetEffects.xml
    - Windows: `C:\Program Files\Adobe\Adobe After Effects <year>\Support Files\PresetEffects.xml`
    - Mac: `/Applications/Adobe After Effects 2020/Adobe After Effects 2020.app/Contents/Frameworks/aelib.framework/Versions/A/Resources/xml/PresetEffects.xml` (you can use Finder's Go to Folder)
2. Restart AE
3. Create a text layer
4. Animation -> Apply Animation Preset -> `Matrix Letters.ffx`
5. `(Optional)` Add master control
    1. Create an adjustment layer
    2. Animation -> Apply Animation Preset -> `Matrix Letters Master.ffx`
    3. Pickwhip properties from your Matrix layer to the master control layer
6. Set the effect how you want it
7. Duplicate the layer and modify properties to add variation
8. `(Optional)` Add a title
    1. Add a text layer and write your title **in all caps**
        - Special characters will not work with the Matrix Code NFI font
    2. Hide the title layer
    2. Select a layer you want to animate to a letter of the title
    3. Select your title layer from the Matrix Letters `Target Title Layer` control
    4. Select the index of the letter in the title with the `Target Title Character Index` control (starts with 0)
    5. Repeat steps 2-4, position and time layers
9. Add styling effects (e.g. grid with only horizontal lines and glows) to taste
