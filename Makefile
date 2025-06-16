# Makefile for managing bun installation, running dev server, and building the project

# Variables
BUNVERSION = bun-v1.2.4
BUN_INSTALL_URL = https://bun.sh/install
PKG_INSTALL_CMD = bun install
DEV_SERVER_CMD = bun run dev
BUILD_CMD = bun run build

# testing port
PORT = 8080

# Targets
.PHONY: all install-bun dev build

all: install-bun dev

install-bun:
	if ! command -v bun; then \
        curl -fsSL $(BUN_INSTALL_URL) | bash -s $(BUNVERSION); \
    else \
        echo "bun is already installed"; \
    fi
    
demo:
	cd dist && 	python3 -m http.server $(PORT)

dev:
	$(PKG_INSTALL_CMD)
	$(DEV_SERVER_CMD)

build:
	$(PKG_INSTALL_CMD)
	$(BUILD_CMD)
