#!/bin/bash

# Colores
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
RED="\033[0;31m"
BLUE="\033[0;34m"
NC="\033[0m" # Sin color

categories=("popular" "top_rated" "upcoming" "now_playing")

for category in "${categories[@]}"; do
  echo -e "\n${BLUE}==============================${NC}"
  echo -e "${BLUE}CATEGORÍA: $category${NC}"
  echo -e "${BLUE}==============================${NC}"

  response=$(curl -s -X GET "http://localhost:3000/api/category/$category" \
    -H "Content-Type: application/json")

  # Mostrar cada película en tabla coloreada
  echo -e "Título\t\tFecha\t\tPopularidad\tVoto"
  echo -e "---------------------------------------------------------"

  echo "$response" | jq -r '.result[] | 
    # Asignar color según vote_average
    .vote_color = if .vote_average >= 8 then "G" elif .vote_average >= 6 then "Y" else "R" end |
    # Asignar color según popularity
    .pop_color = if .popularity >= 500 then "G" elif .popularity >= 200 then "Y" else "R" end |
    "\(.title)\t\(.release_date)\t\(.popularity)\t\(.vote_average)\t\(.vote_color)\t\(.pop_color)"' | \
  while IFS=$'\t' read -r title date pop vote vcolor pcolor; do
    # Elegir colores
    case $vcolor in
      G) vc=$GREEN ;;
      Y) vc=$YELLOW ;;
      R) vc=$RED ;;
    esac
    case $pcolor in
      G) pc=$GREEN ;;
      Y) pc=$YELLOW ;;
      R) pc=$NC ;;
    esac

    # Imprimir con colores
    printf "%-40s %-12s ${pc}%-10s${NC} ${vc}%-5s${NC}\n" "$title" "$date" "$pop" "$vote"
  done
done
