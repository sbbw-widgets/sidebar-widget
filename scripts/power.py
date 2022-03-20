import sys, subprocess, platform
import PySimpleGUI as sg
from screeninfo import get_monitors
monitors = get_monitors()

args = sys.argv[1:]

def get_primary_monitor_size():
    # filter monitors to get the primary one
    primary_monitor = [m for m in monitors if m.is_primary][0]
    # get the size of the primary monitor
    return primary_monitor.width, primary_monitor.height

def fullscreen_window(x, y, w, h):
    focus_windows = sg.Window("Black", layout=[[]], background_color="#000", location=(x, y), size=(w, h), no_titlebar=True, keep_on_top=True, alpha_channel=0.3, finalize=True, grab_anywhere=False)
    # focus_windows.enable()
    return focus_windows

# Acept dialog
def acept_dialog(msg):
    sg.theme('Material1')
    w, h = get_primary_monitor_size()
    layout = [
        [sg.Text(f'Are you sure want {msg}?', font=("Helvetica", 25), text_color="#404040")],
        [sg.Button('Yes'), sg.Button('Cancel')]
    ]
    window = sg.Window('Are you sure?', layout, element_justification='c', keep_on_top=True, resizable=False, location=((w/2) - 250, (h/2) - 50), no_titlebar=True, grab_anywhere=False).finalize()
    window.force_focus()
    acepted = False
    while True:
        event, values = window.read()
        if event == 'Yes':
            acepted = True
            break
        elif event == sg.WIN_CLOSED or event == 'Cancel':
            acepted = False
            break
    window.close()
    return acepted

def show_dialog(msg):
    fw_windows = []
    for m in monitors:
        fw = fullscreen_window(m.x, m.y, m.width, m.height)
    value = acept_dialog(msg)
    for fw in fw_windows:
        fw.close()
    return value

print(show_dialog("shutdown"))

if len(args) == 0:
    # print usage
    sys.exit(1)
else:
    command = args[0]
    args = args[1:]
    
    if command == "poweroff":
        # Detect os
        if show_dialog("shutdown") == True:
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
        if show_dialog("reboot") == True:
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
        if show_dialog("suspend") == True:
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
        if show_dialog("lock") == True:
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
