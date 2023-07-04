#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::Runtime;

#[tauri::command]
async fn open_devtools<R: Runtime>(window: tauri::Window<R>) -> Result<(), String> {
    window.open_devtools();
    Ok(())
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .on_page_load(|window, _| {
            window.eval(include_str!("../../src/injection.js")).unwrap();
        })
        .invoke_handler(tauri::generate_handler![open_devtools])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
