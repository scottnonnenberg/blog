
cp config.toml production_config.toml
cp staging_config.toml config.toml

./build.sh --force

mv production_config.toml config.toml
