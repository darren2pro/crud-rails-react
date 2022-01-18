class Api::V1::TagsController < ApplicationController

  before_action :set_tag, only: %i[ create destroy ]

  # POST /tags or /tags.json
  def create
    @tag = Tag.new(tag_params)

    if @tag.save
      render json: @tag
    else
      render json: @tag.errors
    end
  end

  # DELETE /tags/1 or /tags/1.json
  def destroy
    @tag.destroy

    render json: {notice: "Tag was successfully removed."}
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_tag
    @tag = Tag.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def tag_params
    params.require(:tag).permit(:title, :beer_id)
  end
end
