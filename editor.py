import tkinter as tk
from tkinter import messagebox, filedialog
import re

def update_js():
    js_file = filedialog.askopenfilename(
        title="Select your JS file",
        filetypes=[("JavaScript files", "*.js"), ("All files", "*.*")]
    )
    if not js_file:
        return

    new_email = email_entry.get().strip()
    new_date = date_entry.get().strip()

    if not new_email or not new_date:
        messagebox.showerror("Error", "Please enter both email and cutoff date!")
        return

    try:
        with open(js_file, "r", encoding="utf-8") as f:
            content = f.read()

        # Replace email
        content = re.sub(
            r'encodeURIComponent\(".*?"\)',
            f'encodeURIComponent("{new_email}")',
            content
        )

        # Replace cutoff date
        content = re.sub(
            r'new Date\(".*?"\)',
            f'new Date("{new_date}")',
            content
        )

        with open(js_file, "w", encoding="utf-8") as f:
            f.write(content)

        messagebox.showinfo("Success", f"✅ Updated {js_file}\n\nEmail: {new_email}\nCutoff: {new_date}")

    except Exception as e:
        messagebox.showerror("Error", f"Something went wrong:\n{e}")

# --- GUI ---
root = tk.Tk()
root.title("JS Settings Editor")
root.geometry("350x200")

tk.Label(root, text="Destination Email:").pack(pady=5)
email_entry = tk.Entry(root, width=40)
email_entry.pack()

tk.Label(root, text="Cutoff Date (YYYY-MM-DD):").pack(pady=5)
date_entry = tk.Entry(root, width=40)
date_entry.pack()

save_btn = tk.Button(root, text="Save Settings to JS", command=update_js, bg="#0078d7", fg="white")
save_btn.pack(pady=15)

root.mainloop()
