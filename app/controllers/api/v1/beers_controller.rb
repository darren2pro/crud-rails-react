class Api::V1::BeersController < ApplicationController

  before_action :set_beer, only: %i[ show edit update destroy ]

  # GET /beers or /beers.json
  def index
    @beers = Beer.all.order(brand: :asc)
    render json: @beers.to_json(:include => [:tags])
  end

  # GET /beers/1 or /beers/1.json
  def show
    if @beer
      render json: @beer.to_json(:include => [:tags])
    else
      render json: @beer.errors
    end
  end

  # GET /beers/new
  def new
    @beer = Beer.new
  end

  # GET /beers/1/edit
  def edit
  end

  # POST /beers or /beers.json
  def create
    @beer = Beer.new(beer_params)

    if @beer.save
      render json: @beer
    else
      render json: @beer.errors
    end
  end

  # PATCH/PUT /beers/1 or /beers/1.json
  def update
    if @beer.update(beer_params)
      render json: @beer
    else
      render json: @beer.errors
    end
  end

  # DELETE /beers/1 or /beers/1.json
  def destroy
    @beer.destroy

    render json: {notice: "Beer was successfully removed."}
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_beer
    @beer = Beer.find(params[:id])
    @tags = @beer.tags
  end

  # Only allow a list of trusted parameters through.
  def beer_params
    params.require(:beer).permit(:brand, :style, :country, :quantity)
  end

end
