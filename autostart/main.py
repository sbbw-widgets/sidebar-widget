#
#
#   author: @SergioRibera
#   date:   2020-05-06
#   desc:   This script is a simple example of how overwrite the config.toml to set position to half of the screen
#   requirements: python3, xrandr (linux only), playerctl (linux only)
#
#


#
#   getting the primary monitor by default
#
def get_primary_monitor_size():
    from screeninfo import get_monitors
    monitors = get_monitors()
    # filter monitors to get the primary one
    primary_monitor = [m for m in monitors if m.is_primary][0]
    # get the size of the primary monitor
    return primary_monitor.width, primary_monitor.height


toWrite = ""
# Open the config file
with open('../config.toml') as f:
    # read the file line by line
    for line in f.readlines():
        # find the "y" parameter to replace
        if line.startswith('y'):
            height, width = get_primary_monitor_size()
            # replace the value of the "y" parameter
            toWrite += f"y = \"{str(-((height / 2) + 50))}\" \n"
        else:
            # if is another parameter, just add it
            toWrite += line


#
#  write the new config file
#
with open('../config.toml', 'w') as f:
    f.write(toWrite)

