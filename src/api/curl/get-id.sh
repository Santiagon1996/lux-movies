#!/bin/bash

# Colores
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
RED="\033[0;31m"
BLUE="\033[0;34m"
NC="\033[0m" # Sin color

# IDs de películas a probar
movie_ids=(755898 634649 604822 632357 646385 447404)

SERVER_URL="http://localhost:3000/api/id"

for id in "${movie_ids[@]}"; do
  echo -e "\n${BLUE}==============================${NC}"
  echo -e "${BLUE}PELICULA ID: $id${NC}"
  echo -e "${BLUE}==============================${NC}"

  # Llamada al servidor
  response=$(curl -s -X GET "$SERVER_URL/$id" -H "Content-Type: application/json")

  # Validar JSON
  echo "$response" | jq . >/dev/null 2>&1
  if [ $? -ne 0 ]; then
    echo -e "${RED}⚠️ Respuesta inválida para el ID $id:${NC}"
    echo "$response"
    continue
  fi

  # Manejo de errores de API
  error=$(echo "$response" | jq -r '.error // empty')
  if [ -n "$error" ]; then
    echo -e "${RED}⚠️ Error para la película $id: $error${NC}"
    continue
  fi

  # Extraer datos
  title=$(echo "$response" | jq -r '.result.title // "N/A"')
  release_date=$(echo "$response" | jq -r '.result.release_date // "N/A"')
  rating=$(echo "$response" | jq -r '.result.vote_average // 0')
  vote_count=$(echo "$response" | jq -r '.result.vote_count // 0')
  popularity=$(echo "$response" | jq -r '.result.popularity // 0')
  overview=$(echo "$response" | jq -r '.result.overview // "Sin descripción"')
  poster_path=$(echo "$response" | jq -r '.result.poster_path // ""')

  # Colores según rating y popularidad
  if awk "BEGIN {exit !($rating >= 8)}"; then
    rating_color=$GREEN
  elif awk "BEGIN {exit !($rating >= 6)}"; then
    rating_color=$YELLOW
  else
    rating_color=$RED
  fi

  if awk "BEGIN {exit !($popularity >= 500)}"; then
    pop_color=$GREEN
  elif awk "BEGIN {exit !($popularity >= 200)}"; then
    pop_color=$YELLOW
  else
    pop_color=$NC
  fi

  # Mostrar información
  printf "%-40s %-12s ${pop_color}%-10s${NC} ${rating_color}%-5s${NC}\n" "Título" "Estreno" "Popularidad" "Rating"
  printf "%-40s %-12s ${pop_color}%-10s${NC} ${rating_color}%-5s${NC}\n" "$title" "$release_date" "$popularity" "$rating"
  echo -e "⭐ Votos: $vote_count"
  if [ -n "$poster_path" ]; then
    echo -e "🖼 Poster: https://image.tmdb.org/t/p/w500$poster_path"
  fi
  echo -e "\n📝 Sinopsis: $overview\n"
done
