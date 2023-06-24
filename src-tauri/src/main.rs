#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::thread;
use tauri_plugin_window_state;
use tauri::Manager;

fn main() {
    tauri::Builder::default()
    .plugin(tauri_plugin_window_state::Builder::default().build())
    .setup(|app| {
        let window = app.get_window("main").unwrap();
        thread::spawn(move || {
            window.eval("window.location.replace('https://pw.live/');").unwrap();
        });
        Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}