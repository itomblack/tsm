Use the use-this-as-default-icon-size.svg as a basis for the icon.

The icons come from creative in all sizes but for the most part resize them in the above file and then upload to icomoon.

Otherwise the sizes are all over the place.

There will be cases where individual fonts need resizing in the CSS depending on their use case.


ICOMOON -
Extract tsm.zip and upload the .json file to icomoon app, then add new icons.

On generating font, ensure the class prefix is .icon__, otherwise your icons won't show in the browser.

On saving, extract zip file, make sure fonts are named tsm.XXX, also name the font tsm.zip and overwrite existing files.

When adding new font, compare the 'content' value of the new icon and see if it existed previously in icons.scss. If it did exist then something has gone wrong. All new icons should have a new 'content' value.