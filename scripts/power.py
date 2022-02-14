import sys, subprocess, platform


args = sys.argv[1:]

#
# TODO: make acept and cancel dialog widget
#

if len(args) == 0:
    # print usage
    sys.exit(1)
else:
    command = args[0]
    args = args[1:]
    
    if command == "poweroff":
        # Detect os
        if platform.system() == "Linux":
            subprocess.call(["poweroff"])
        elif platform.system() == "Darwin":
            subprocess.call(["osascript", "-e", "'tell app \"loginwindow\" to «event aevtrsdn»'"])
        elif platform.system() == "Windows":
            subprocess.call(["shutdown", "-s", "-t", "0"])
        else:
            print("Unsupported OS")
            sys.exit(1)
    elif command == "reboot":
        # Detect os
        if platform.system() == "Linux":
            subprocess.call(["reboot"])
        elif platform.system() == "Darwin":
            subprocess.call(["osascript", "-e", "'tell app \"loginwindow\" to «event aevtrrst»'"])
        elif platform.system() == "Windows":
            subprocess.call(["shutdown", "-r", "-t", "0"])
        else:
            print("Unsupported OS")
            sys.exit(1)
    elif command == "suspend":
        # Detect os
        if platform.system() == "Linux":
            subprocess.call(["systemctl", "suspend"])
        elif platform.system() == "Darwin":
            subprocess.call(["osascript", "-e", "osascript -e 'tell app \"System Events\" to sleep'"])
        elif platform.system() == "Windows":
            subprocess.call(["shutdown", "-h", "-t", "0"])
        else:
            print("Unsupported OS")
            sys.exit(1)
    elif command == "lock":
        # Detect os
        if platform.system() == "Linux":
            subprocess.call(["gnome-screensaver-command", "--lock"])
        elif platform.system() == "Darwin":
            subprocess.call(["osascript", "-e", "'tell application \"System Events\" keystroke \"q\" using {control down, command down} end tell'"])
        elif platform.system() == "Windows":
            subprocess.call(["shutdown", "-h", "-t", "0"])
        else:
            print("Unsupported OS")
            sys.exit(1)
    else:
        print("Unknown command")
        sys.exit(1)
