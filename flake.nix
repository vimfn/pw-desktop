{
  description = "Rust, Cargo and Tauri Project";
  inputs.nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
  outputs = { self, nixpkgs }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
      packages = with pkgs; [
        curl
        wget
        pkg-config
        dbus
        openssl_3
        glib
        gtk3
        libsoup
        webkitgtk
        librsvg
        cargo
        rustc
        rustfmt
        rustPackages.clippy
        rust-analyzer
        (nodejs_18.override { enableNpm = false; })
        nodePackages.pnpm
        nil
        nixpkgs-fmt
      ];
    in
    {
      devShells.${system}.default =
        pkgs.mkShell {
          inherit packages;
          RUST_SRC_PATH = pkgs.rustPlatform.rustLibSrc;
        };
    };
}
    

