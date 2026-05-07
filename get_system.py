import platform
import socket
import uuid
import subprocess
import re


def get_mac_address():
    mac = ':'.join(re.findall('..', '%012x' % uuid.getnode()))
    return mac.upper()


def get_laptop_name():
    return socket.gethostname()


def get_windows_edition():
    try:
        output = subprocess.check_output(
            "wmic os get Caption",
            shell=True
        ).decode(errors="ignore")

        lines = [line.strip() for line in output.split("\n") if line.strip()]
        if len(lines) > 1:
            return lines[1]
    except:
        pass
    return "Unknown"


def get_antivirus():
    try:
        cmd = r'powershell "Get-CimInstance -Namespace root/SecurityCenter2 -ClassName AntivirusProduct | Select-Object displayName"'
        output = subprocess.check_output(
            cmd,
            shell=True
        ).decode(errors="ignore")

        lines = [line.strip() for line in output.split("\n") if line.strip()]

        if len(lines) > 1:
            av_list = lines[1:]
            return ", ".join(av_list)
        else:
            return "No"
    except:
        return "Unknown"


def get_latest_patch():
    try:
        cmd = r'powershell "(Get-ComputerInfo).WindowsVersion"'
        output = subprocess.check_output(
            cmd,
            shell=True
        ).decode().strip()

        return output
    except:
        return "Unknown"


def get_yasref_image():
    # Custom check based on your company image naming convention
    # Update this logic as needed
    laptop_name = get_laptop_name()

    if "yasref" in laptop_name.lower():
        return "Yes"

    return "No"


print("=" * 50)
print("Laptop MAC Address:", get_mac_address())
print("Laptop Name:", get_laptop_name())
print("Laptop Type:", get_windows_edition())
print("Yasref OS Image:", get_yasref_image())
print("Antivirus Installed:", get_antivirus())
print("Latest OS Patches:", get_latest_patch())
print("=" * 50)
